import { Router } from "express";

export function setMeasurementRoutes (router: Router){
    router.get('/measurements', (req, res) => {
        res.send("this is the measurement route!!")
    })
}