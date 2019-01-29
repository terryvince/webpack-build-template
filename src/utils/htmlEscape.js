// html输入字符串转义，避免跨站脚本攻击
export default {
    escape(text) {
        return text.replace(/[<>"&]/g, function (match) {
            switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '"':
                return '&quot;';
            }
        });
    },
    unescape: function (text) {
        return text.replace(/(&lt;)|(&gt;)|(&amp;)|(&quot;)/g, function (match) {
            switch (match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&amp;':
                return '&';
            case '&quot;':
                return '"';
            }
        });
    }
};
