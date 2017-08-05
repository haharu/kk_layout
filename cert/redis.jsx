import {isProductionDB} from '../config'

export default(() => {
    return isProductionDB
        ? {
            host: "redis-session.example.com",
            db: 1,
            prefix: "sessions:"
        }
        : {
            host: "redis-session.sit.example.com",
            db: 7,
            prefix: "sessions:"
        }
})()
