export default {
    methods: {
        dateTime(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "2-digit", hour: '2-digit', minute: '2-digit' })
        },
        dateOnly(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "2-digit" })

        },
        timeOnly(val) {
            //convert to date time string
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        },
    }
}