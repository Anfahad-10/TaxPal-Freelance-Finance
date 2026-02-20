const express = require("express") 
const authController = require("../controllers/auth.controller")
const { protect } = require("../middlewares/auth.middleware")
const router = express.Router()



/*   POST /api/auth/register   */
router.post("/register", authController.userRegisterController)

/*   POST /api/auth/login   */
router.post("/login", authController.userLoginController)

/* --- NEW ROUTES for Forgot Password --- */


/*   POST /api/auth/forgot-password   */
router.post("/forgot-password", authController.forgotPasswordController);

/*   POST /api/auth/reset-password/:token   */
router.post("/reset-password/:token", authController.resetPasswordController);

/*   GET /api/auth/me   */
// It checks the token first. If it fails, the controller never runs.
router.get("/me", protect, authController.getUserProfile);

module.exports = router