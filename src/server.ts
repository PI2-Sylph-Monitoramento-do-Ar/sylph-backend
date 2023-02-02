import { app } from "./app"
import { envs } from "./config/env"

app.listen(envs.port, () => console.log(`Server running at http://localhost:${envs.port}`))
