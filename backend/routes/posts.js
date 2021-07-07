

const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const PostController = require("../controllers/post");


 /* dajem v backend */
 router.post('', checkAuth, PostController.inBackend);

/* Update post */
router.put("/:id", checkAuth, PostController.updatePost);



/* dajem iz backenda */
router.get("", PostController.fromBackend);


router.get("/:id", PostController.fromBackendId);

/* brišem iz backenda */

router.delete("/:id", checkAuth, PostController.deleteFromBackend);

module.exports = router;
