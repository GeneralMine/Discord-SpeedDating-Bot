module.exports.later = (delay) => new Promise((resolve) => {
    setTimeout(resolve, delay);
});

module.exports.wait = function () {
    this.result = 0;

    this.weeks = function (amount = 1) {
        this.days(7);
        return this;
    }

    this.days = function (amount = 1) {
        this.hours(24);
        return this;
    }

    this.hours = function (amount = 1) {
        this.minutes(amount * 60);
        return this;
    };

    this.minutes = function (amount = 1) {
        this.seconds(amount * 60);
        return this;
    };

    this.seconds = function (amount = 1) {
        this.result += (amount * 1000);
        return this;
    }

    this.minusSeconds = function (amount = 1) {
        this.result -= (amount * 1000);
        return this;
    }

    this.and = function () {
        const res = this.result;
        return new Promise((resolve) => {
            setTimeout(resolve, res);
        });
    };

    return this;
}

// WENN MAN EINE ASYNC FUNCTION AUFRUFT
function a() {
    f()
    .then((val) => {
        
    }).catch((err) => {

    })
}

// WIE DAS DING HIER FUNKTIONIERT
async function f() {
    // chaining
    await wait().minutes(0.5).and();
    
    console.log();

    await wait().weeks(3).and().then(() => {
        console.log();
    });

    console.log();
}
// KÜSSCHEN