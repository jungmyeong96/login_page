if (process.env.NODE_ENV === 'production') { //배포가 되었는지?
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}

//보안을 위해서 키값을 분리해줌