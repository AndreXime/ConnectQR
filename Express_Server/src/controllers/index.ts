import Empresa from "./protected/Empresa.js";
import Categoria from "./protected/Categoria.js";
import Produto from "./protected/Produto.js";
import PublicInfo from "./InfoPublica.js";
import Auth from "./AuthController.js";
import { Feedback } from "./feedback/feedback.js";
import { FeedbackAdmin } from "./feedback/feedbackadmin.js";

export default { Empresa, Produto, PublicInfo, Auth, Categoria, Feedback, FeedbackAdmin };

export { Empresa, Produto, PublicInfo, Auth, Categoria, Feedback, FeedbackAdmin };
