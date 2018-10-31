
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} 
async function getComponent() {
    var element = document.createElement('div');
    const _ = await import(/* webpackChunkName: "lodash1" */ 'lodash');
    // const countDown = await import(/* webpackChunkName: "countDown" */ './countDown')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    console.log(element);
    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = e => import(/* webpackChunkName: "print" */ './countDown').then(module => {
        var countDown = module.default;

        const countDown1 = new countDown(false, new Date().getTime() + 100000000, (date) => {
            console.log(date.d + '天' + date.h + '小时' + date.m + '分钟' + date.s + '秒');
        });

    });

    element.appendChild(btn);

    return element;
}


getComponent().then(component => {
    document.body.appendChild(component);
});


if (module.hot) {
    module.hot.accept('./countDown.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    })
}


// const countDown1 = new countDown(false, new Date().getTime() + 100000000, (date) => {
//     console.log(date.d + '天' + date.h + '小时' + date.m + '分钟' + date.s + '秒');
// });