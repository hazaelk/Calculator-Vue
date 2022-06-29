import Vue from 'vue';
import App from './App';

new Vue({
    render: blabla => blabla(App)
    // render(createElement){
    //     return createElement(App)
    // } mesma coisa que está na linha 5
}).$mount("#app")