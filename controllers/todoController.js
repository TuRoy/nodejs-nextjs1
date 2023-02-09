const todoModel = require("../models/todolistModel")




exports.createtodo = async function (req, res) {
    try {
        console.log(888, req.body);
        const checked = await todoModel.findOne({ username: req.body.username })
        if (checked) {
            res.status(200).json({ status: 'đã thêm trước đó' })
        } else {
            const data = await todoModel.create({
                IDuser: req.body.IDuser,
                username: req.body.username,
                address: req.body.address,
                birthday: req.body.birthday,
                role: req.body.role,
                date: new Date(Date.now())
            })
            res.status(200).json({ status: 'success', data })
        }
    } catch (error) {
        res.status(200).json({ status: 'error server', error })
    }
}


exports.deletetodo = async function (req, res) {
    try {
        console.log(req.params.id);
        const dele = await todoModel.deleteOne({ _id: req.params.id })
        if (dele) {
            res.status(200).json({ status: 'delete success', dele })
        } else {
            res.status(200).json({ status: 'delete error' })
        }
    } catch (error) {
        res.status(200).json({ status: 'error server', error })
    }
}


exports.updatetodo = async function (req, res) {
    try {
        const checked = await todoModel.updateOne({ _id: req.body.id }, {
            username: req.body.username,
            role: req.body.role,
            address: req.body.address,
            birthday: req.body.birthday
        })
        res.status(200).json({ status: 'update success', checked })
    } catch (error) {
        res.status(500).json({ status: 'error server', error })
    }
}


exports.findtodo = async function (req, res) {
    try {
        let roles = req.query.role
        let searchName = req.query.search
        let page = req.query.page
        let pageSize = req.query.pagesize
        page = page !== undefined ? page : 1
        pageSize = pageSize !==undefined ? pageSize : 5
        if (!roles) {
            let data = await todoModel.find()
            if (searchName) {
                data = data.filter(value => value.username.includes(searchName))
            }
            let size = data.length
            data =data.filter((value,index)=>{ index >=(req.query.page - 1)*req.query.pagesize && index <=req.query.page*req.query.pagesize})
            res.status(200).json({ status: ' success', data: data.reverse() , size:size})


        } else {
            if (roles == 'All') {
                let data = await todoModel.find()
                if (searchName) {
                    data = data.filter(value => value.username.includes(searchName))
                }
                let size = data.length
                data = data.reverse().filter((value,index)=> index >= (page - 1)*pageSize && index < page*pageSize)
                res.status(200).json({ status: ' success', data: data, size})
            } else {
                let data = await todoModel.find({ role: roles })
                if (searchName) {
                    data = data.filter(value => value.username.includes(searchName))
                }
                let size = data.length
                data = data.filter((value,index)=> index >= (page - 1)*pageSize && index < page*pageSize)
                console.log(91, data);
                res.status(200).json({ status: ' success', data: data.reverse(), size: size })

            }

            // res.status(200).json({ status: ' success', data })
        }

    } catch (error) {
        res.status(500).json({ status: 'error server', error })
    }
}



exports.gettodobyID = async function (req, res) {
    try {
        let data = await todoModel.find({ IDuser: req.params.IDuser })
        console.log(req.query);
        // if( req.query.start !== 'undefined' && req.query.end !== 'undefined'){
        //     console.log(1231312313);
        //     data = data.filter(value=> { (new Date(value.date) > new Date(req.query.start)) && (new Date(value.date) < new Date(req.query.end)) })
        // }
        console.log(data);
        if (data) {
            res.status(200).json({ status: 'success', data })
        } else {
            res.status(200).json({ status: 'success', data: [] })
        }
    } catch (error) {
        res.status(500).json({ status: 'error server', error })
    }
}

exports.getalltodo = async function (req, res) {
    try {
        let page = req.query.page
        let pageSize = req.query.pagesize
        page = page !== 'undefined' ? page : 1
        pageSize = pageSize !=='undefined' ? pageSize : 5
        const check  = await todoModel.find()
        let data = await todoModel.find()
        // .skip((page - 1)*pageSize).limit( pageSize)
        data = data.reverse().filter((value,index)=> index >= (page - 1)*pageSize && index <  pageSize*page)
        res.status(200).json({ status: 'success', data: data , size: check.length})
    } catch (error) {
        res.status(200).json({ status: 'error server', error })
    }
}







