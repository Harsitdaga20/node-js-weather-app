const express=require('express')
const path=require('path')
const app=express()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'Hello weather',
        title:'Weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Harsit',
        title:'About Me'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Harsit',
        message:'Ask for help',
        title:'Help page'
    })
})

//setup static directory pathl
app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,position}={})=>{
        if(error){
            return res.send({
                errors
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error) return res.send({
                error
            })
            res.send({
                location:position,
                forecast:forecastdata
            })
        })
    })
    // res.send(
    //     { 
    //         forecast:'It is raining',
    //         location:sdfsf
    //     }
    // )
})


app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errors',{
        name:'Harsit',
        title:'Help page',
        errormessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('errors',{
        name:'Harsit',
        title:'404 Page',
        errormessage:'404 error '
    })
})

app.listen(port,()=>{
    console.log('server ready')
})