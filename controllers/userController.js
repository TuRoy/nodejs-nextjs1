const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = async function (req, res) {
    try {
        const checked = await userModel.findOne({ email: req.body.email })
        if (checked) {
            res.status(200).json({ status: 'email đã được dùng' })

        }else{
            const pass = await bcrypt.hash(req.body.password, 10)
         
            const data = await userModel.create({
                email:req.body.email,
                password: pass,
                username: req.body.username,
                date: new Date(Date.now())
            })
            res.status(200).json({ status: 'Tạo tài khoản thành công', data: data})
        }
    } catch (error) {
        console.log(234234);
        res.status(500).json({ status: 'error server', error })
    }
}

exports.signIn = async function(req, res){
    try {
        const data = await userModel.findOne({email:req.body.email})
        if(data){
            const checked = await bcrypt.compare(req.body.password, data.password)
            // console.log(checked);
            if(checked){
                const token = jwt.sign({data}, 'token');
                res.status(200).json({ status: 'Đăng nhập thành công', data: data , token})
            }else{
                res.status(200).json({ status: 'Sai password'})
            }
        }else{
            res.status(200).json({ status: 'Sai email' })
        }
    } catch (error) {
        res.status(200).json({ status: 'error server', error })
        
    }
}


exports.getAlluser = async function(req, res){
    try {
        const data = await userModel.find()
         console.log(data);
        res.status(200).json({ status: 'success', data:data })

    } catch (error) {
        res.status(200).json({ status: 'error server', error })
    }
}   

exports.getUserLogged = async function(req, res){
    try {
        const datachecked = jwt.verify(req.body.token, 'token');
        const data  = await userModel.findOne({_id: datachecked._id})
        if(data){
            res.status(200).json({status: 'success', data: data})
        }else{
            res.status(200).json({status: 'Đăng nhập không thành công!'})
        }
        
    } catch (error) {
        res.status(200).json({ status: 'error server', error })
    }
}

exports.deleteUser = async function(req, res){
try {
    const data = await userModel.deleteOne({_id: req.body.ID})
    res.status(200).json({status: 'success', data: data})
} catch (error) {
    res.status(200).json({ status: 'error server', error })
    
}
}



