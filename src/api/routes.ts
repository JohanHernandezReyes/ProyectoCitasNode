import express, { Router } from "express";
import doctoresRoutes from "./components/doctores/doctoresRoutes"
import pacientesRoutes from "./components/pacientes/pacientesRoutes"
import citasRoutes from "./components/citas/citasRoutes"

const router = Router();
router.use('/doctores', doctoresRoutes);
router.use('/pacientes', pacientesRoutes);
router.use('/citas', citasRoutes);

export default router;