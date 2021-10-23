const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  sign: async (user) => {
    const payload = {
      userInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    };

    const tokenOption = {
      expiresIn: "30m", // 10분
      issuer: "localhost",
    };

    return jwt.sign(payload, process.env.JWT_SECRET, tokenOption);
  },
  verify: (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        const error = new Error();
        error.name = "TokenisEmptyError";
        throw error;
      }
      // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환
      req.decoded = jwt.verify(token, process.env.JWT_SECRET);
      return next();
    } catch (error) {
      // 인증 실패
      // 유효기간이 초과된 경우
      if (error.name === "TokenExpiredError") {
        return res.status(419).json({
          message: "토큰이 만료되었습니다.",
        });
      }

      if (error.name === "TokenisEmptyError") {
        return res.redirect("/");
      }

      // 토큰의 비밀키가 일치하지 않는 경우
      return res.status(401).json({
        message: "유효하지 않은 토큰입니다.",
      });
    }
  },
};
