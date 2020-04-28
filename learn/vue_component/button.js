"use strict";
/**
 * Created by songj on 2019/12/12.
 */


Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">按钮点击 {{ count }} 次数</button>'
})

new Vue({ el: '#components-demo' })