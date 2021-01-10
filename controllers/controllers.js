const Blog = require('../model/model');

// find all blogs
exports.getall = async (req, res) => {

    // Blog.find()
    //     .then((data)=>{
    //         res.status(200).json(data);
    //     })
    //     .catch((err)=>{
    //         if(err) res.status(500).json(err);
    //     });
    let data;
    try {
        data = await Blog.find();
        // console.log(data);

    } catch (err) {
        if (err) return res.status(500).json(err);
    }
    res.status(200).json(data);
}

// find single blog by id
exports.getone = async (req, res) => {
    // console.log(req.params);
    let data;
    try {
        const value = req.params.value;
        const type = req.params.type;
        // console.log(value);
        // console.log(type);
        let query;
        switch(type){
            case "000" :
                query = {"id" : value};
                break;
            case "100" :
                query = {"title" : value};
                break;
            case "010" :
                query = {"author" : value};
                break;
            case "001" : 
                query = {"desc" : value};
                break;
        }

        // console.log(query);
        data = await Blog.find(query);
    }
    catch (err) {
        if (err) return res.status(500).json(err);
    }
    if (!data) return res.status(404).json({ "msg": "Blog not found" });
    res.status(200).json(data);

    // Blog.findById(req.params.blogID)
    //     .then((data)=>{
    //         if(!data) return res.status(404).json({"mag":"Blog not found"});
    //         res.status(200).json(data);
    //     })
    //     .catch((err)=>{
    //         if(err) res.status(500).json(err);
    //     })

}
//author 
//title 
//desc 


// create a blog
exports.create = async (req, res) => {


    let data, newblog;
    try {
        const newreq = await req;
        console.log(newreq);

        newblog = new Blog({
            title: newreq.body.title,
            author: newreq.body.author,
            desc: newreq.body.desc
        });
        
        data = await newblog.save();
    }
    catch (err) {
        if (err) return res.status(500).json(err);
    }
    res.status(201).json({ "msg": "created", "blog": newblog });

    // newblog.save().then((blog)=>{
    //     res.status(201).json({"msg":"created","blog":blog});
    // }).catch((err)=>{
    //     if(err) return res.status(500).json(err);
    // })
}

//to update a blog

exports.updateone = async (req, res) => {

    let data;
    try {
        if (!req.body.title || !req.body.desc || !req.body.author)
            return res.status(500).json({ "msg": "fill all the fields" });

        data = await Blog.findByIdAndUpdate(req.params.blogID, {
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc
        }, { new: true })
    }
    catch (err) {
        if (err) res.status(500).json(err);
    }

    if (!data) return res.status(404).json({ "msg": "Not found" });
    res.status(202).json({
        "msg": "updated",
        "doc": data
    });

    // if (!req.body.title || !req.body.desc || !req.body.author)
    //     return res.status(500).json({ "msg": "fill all the fields" });

    // Blog.findByIdAndUpdate(req.params.blogID, {
    //     title: req.body.title,
    //     author: req.body.author,
    //     desc: req.body.desc
    // }, { new: true })
    //     .then((data) => {

    //         if (!data) return res.status(404).json({ "msg": "Not found" });
    //         res.status(202).json({
    //             "msg": "updated",
    //             "doc": data
    //         });
    //     })
    //     .catch((err) => {
    //         if (err) res.status(500).json(err);
    //     })
}

// to delete a blog

exports.deleteone = async (req, res) => {

    let data;
    try{
        data = await Blog.findByIdAndDelete(req.params.blogID);
    }
    catch(err){
        if (err) res.status(500).json(err);
    }
    if (!data) return res.status(404).json({ "msg": "Blog not found" });

    res.status(202).json({
        "msg": "deleted",
        "doc": data
    });

    // Blog.findByIdAndDelete(req.params.blogID)
    //     .then((data) => {

    //         if (!data) return res.status(404).json({ "msg": "Blog not found" });

    //         res.status(202).json({
    //             "msg": "deleted",
    //             "doc": data
    //         });

    //     })
    //     .catch((err) => {
    //         if (err) res.status(500).json(err);
    //     });

}