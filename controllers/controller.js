const {Incubator, Startup} = require("../models");
const {toRupiah, sum} = require('../helpers/helper');
const chalk = require('chalk');

class Controller {

    //? READ & RENDER INCUBATORS LIST
    // GET /incubators
    static showIncubators(req, res){
        Incubator.findAll()
        .then((data) => {
            res.render('home', { data : data })
            console.log(chalk.blue("SUCCEED : SHOW INCUBATORS DATA"));
        }).catch((err) => {
            res.render(err)
            console.log(chalk.red("FAILED TO SHOW INCUBATORS DATA"));
        });
    }

    //? SHOW INCUBATOR DETAIL PAGE
    // GET /incubators/:IncubatorId
    static incubatorDetail(req, res){
        let errMsg = req.query.msg
        const id = +req.params.incubatorId
        Incubator.findOne({
            where : { id : id },
            include : Startup
        })
        .then((data) => {
            res.render('incubatorDetail', { data, toRupiah, sum, errMsg });
            console.log(chalk.blue("SUCCEED : RENDERING INCUBATOR DETAILS PAGE"));
        }).catch((err) => {
            res.send(err)
            console.log(chalk.red("FAILED : RENDERING INCUBATOR DETAILS PAGE"));
        });
    }

    //? READ STARTUP LIST
    // GET /startUp
    static showStartups(req, res){
        const { filter, sort } = req.query
        let query = {
            include: { model : Incubator },
            order: [["valuation", "DESC"]]
        }
        if(filter) {
            query.where = {
                roleOfFounder: filter
            }
        }
        if(sort){
            query.order =  [
                [sort, 'ASC']
            ]
        }
        Startup.findAll(query)
        .then((data) => {
            res.render('startup', { data, toRupiah })
            console.log(chalk.blue("SUCCEED : SHOW STARTUP DATA"));
        }).catch((err) => {
            res.render(err)
            console.log(chalk.red("FAILED TO SHOW STARTUP DATA"));
        });
    }

    //? SHOW CREATE NEW INCUBATOR PAGE
    // POST /incubators/add
    static addIncubatorPage(req, res){
        res.render('newIncubator');
        console.log(chalk.blue("SUCCEED : RENDERING CREATE NEW INCUBATOR PAGE"));
    }

    //? CREATE NEW INCUBATOR
    // GET /incubators/add
    static addIncubator(req, res){
        const { name, location, level} = req.body
        Incubator.create({ name, location, level })
        .then((data) => {
            res.redirect('/incubators')
            console.log(chalk.blue("SUCCEED : ADD NEW INCUBATOR"));
        }).catch((err) => {
            res.render(err);
            console.log(chalk.red("ERROR : FAILED TO ADD NEW INCUBATOR")); 
        });
    }

    //? SHOW CREATE NEW STARTUP PAGE
    // GET /incubators/:incubatorId/startUp/add
    static addStartupPage(req, res){
        const id = +req.params.incubatorId
        res.render('newStartup', {id : id});
        console.log(chalk.blue("SUCCEED : RENDERING CREATE NEW STARTUP PAGE"));
    }

    //? CREATE NEW STARTUP
    // POST /incubators/:incubatorId/startUp/add
    static addStartup(req, res){
        const { startUpName, founderName, dateFound, roleOfFounder, valuation, educationOfFounder } = req.body
        Startup.create({ startUpName, founderName, dateFound, roleOfFounder, valuation, educationOfFounder, IncubatorId : req.params.incubatorId })
        .then((data) => {
            res.redirect(`/incubators/${data.IncubatorId}`)
            console.log(chalk.blue("SUCCEED : CREATE NEW STARTUP =>", startUpName));
        }).catch((err) => {
            if (err.errors) {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
            console.log(chalk.red("FAILED CREATE NEW STARTUP"));
        });
    }

    //? RENDER EDIT STARTUP PAGE
    // GET /incubators/:incubatorId/startUp/:startUpId/edit
    static editStartupPage(req,res){
        let x = req.params.incubatorId
        let y = req.params.startUpId

        Startup.findOne({
            where : { id : y }
        })
        .then((data) => {
            res.render('editStartup', { data, x, y });
            console.log(chalk.blue("SUCCEED : RENDERING EDIT STARTUP PAGE"));
        }).catch((err) => {
            res.send(err)
            console.log(chalk.red("ERROR : FAILED RENDERING EDIT STARTUP PAGE"));
        });
    } 

    //? EDIT STARTUP
    // POST /incubators/:incubatorId/startUp/:startUpId/edit
    static editStartUp(req, res){
        let x = req.params.incubatorId
        let y = req.params.startUpId
        let { startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation } = req.body
        
        Startup.update({
            startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation, IncubatorId : x}, 
            { where: { id : y }
         })
         .then((result) => {
            res.redirect(`/incubators/${x}`)
            console.log(chalk.blue("SUCCEED : EDIT STARTUP WITH ID : ", y));
         })
         .catch((err) => {
            if (err.errors) {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
            res.send(errors)
         })
    }


    //? DELETE STARTUP
    // GET /incubators/:incubatorId/startUp/:startUpId/delete
    static deleteStartup(req, res){
        let x = ''
        const id = +req.params.startUpId
        Startup.findByPk(id)
        .then((data) => {
            x = data
            return Startup.destroy({
                where : { id }
            })
        })
        .then((result) => {
            res.redirect(`/incubators/${x.IncubatorId}?msg=Start-Up%20${x.startUpName}%20with%20${x.founderName}%20as%20founder%20has%20been%20removed`);  // BELUM KELARRRR
            console.log(chalk.blue("SUCCEED : DELETE STARTUP WITH ID =>", id));
        }).catch((err) => {
            res.send(err)
            console.log(chalk.red("ERROR : FAILED DELETE STARTUP"));
        });
       
    }
}

module.exports = Controller