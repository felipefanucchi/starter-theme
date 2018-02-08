// requires: lib.js app.js
{
    let helloWorld = 'hello world';
    
    const say = (speak) => {
        return speak;
    }
    
    var saying = say(speak);
    
    console.log(saying);
}