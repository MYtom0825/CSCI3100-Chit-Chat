import React, { Component } from 'react'

class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            //calculate the loading time for each interval
            if (seconds === 59){
                this.setState(({ minutes }) => ({
                    minutes: minutes + 1,
                    seconds: 0
                }))
            }
            else if (seconds >= 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds + 1
                }))
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        //display the loading time
        return (
            <div>
                {<h1 className="pop_up_quiz_title">Queueing time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default Timer;
