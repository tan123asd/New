import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faGraduationCap,
  faHandHoldingHeart,
  faUserShield,
  faUsers,
  faChalkboardTeacher,
  faUserPlus,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.css";

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();

  const surveyQuestions = [
    {
      id: "motivation",
      question: "Điều gì thúc đẩy bạn tham gia chương trình của chúng tôi?",
      options: [
        "Mong muốn giúp đỡ cộng đồng",
        "Quan tâm đến vấn đề phòng chống ma túy",
        "Có người thân/bạn bè từng gặp vấn đề",
        "Muốn học hỏi và phát triển bản thân",
        "Khác (vui lòng mô tả)",
      ],
      allowOther: true,
    },
    {
      id: "experience",
      question: "Bạn có kinh nghiệm gì liên quan đến công tác phòng chống ma túy không?",
      options: [
        "Chưa có kinh nghiệm",
        "Đã từng tham gia các hoạt động tình nguyện",
        "Đã từng tham gia các khóa học/tập huấn",
        "Có kinh nghiệm làm việc trong lĩnh vực này",
        "Khác (vui lòng mô tả)",
      ],
      allowOther: true,
    },
    {
      id: "expectations",
      question: "Bạn mong đợi điều gì khi tham gia chương trình?",
      options: [
        "Học hỏi kiến thức chuyên môn",
        "Kết nối với cộng đồng",
        "Phát triển kỹ năng mềm",
        "Có cơ hội đóng góp cho xã hội",
        "Khác (vui lòng mô tả)",
      ],
      allowOther: true,
    },
    {
      id: "availability",
      question: "Bạn có thể dành bao nhiêu thời gian cho các hoạt động của chương trình?",
      options: [
        "1-2 giờ/tuần",
        "3-5 giờ/tuần",
        "6-10 giờ/tuần",
        "Trên 10 giờ/tuần",
        "Chỉ có thể tham gia vào cuối tuần",
      ],
      allowOther: false,
    },
    {
      id: "concerns",
      question: "Bạn có lo ngại gì về chương trình không?",
      options: [
        "Không có lo ngại",
        "Lo ngại về thời gian",
        "Lo ngại về khả năng đóng góp",
        "Lo ngại về tính bảo mật",
        "Khác (vui lòng mô tả)",
      ],
      allowOther: true,
    },
  ];

  const roles = [
    {
      id: "student",
      title: "Học Sinh/Sinh Viên",
      icon: faGraduationCap,
      description: "Truy cập khóa học và tài nguyên giáo dục",
    },
    {
      id: "parent",
      title: "Phụ Huynh",
      icon: faUsers,
      description: "Hỗ trợ và đồng hành cùng con trong việc phòng chống ma túy",
    },
    {
      id: "teacher",
      title: "Giáo Viên",
      icon: faChalkboardTeacher,
      description: "Truy cập tài liệu giảng dạy và chương trình giáo dục",
    },
    {
      id: "volunteer",
      title: "Tình Nguyện Viên",
      icon: faHandHoldingHeart,
      description: "Tham gia các hoạt động tình nguyện và hỗ trợ cộng đồng",
    },
    {
      id: "counselor",
      title: "Tư Vấn Viên",
      icon: faUserShield,
      description: "Cung cấp tư vấn và hỗ trợ chuyên môn",
    },
    {
      id: "other",
      title: "Khác",
      icon: faUserPlus,
      description: "Tham gia với vai trò khác trong cộng đồng",
    },
  ];

  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState(
    surveyQuestions.reduce((acc, q) => ({
      ...acc,
      [q.id]: { selected: "", other: "" },
    }), {})
  );
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setShowRoleSelection(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!isLogin && !formData.name) {
      newErrors.name = "Họ tên là bắt buộc";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (isLogin) {
      // Handle login logic here
      console.log("Login submitted:", formData);
      // After successful login, redirect to dashboard
      navigate("/dashboard");
    } else {
      // For registration, show role selection
      console.log("Registration submitted:", formData);
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelection = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleOptionSelect = (option) => {
    setSurveyAnswers({
      ...surveyAnswers,
      [surveyQuestions[currentQuestionIndex].id]: {
        ...surveyAnswers[surveyQuestions[currentQuestionIndex].id],
        selected: option,
      },
    });
  };

  const handleOtherInput = (e) => {
    setSurveyAnswers({
      ...surveyAnswers,
      [surveyQuestions[currentQuestionIndex].id]: {
        ...surveyAnswers[surveyQuestions[currentQuestionIndex].id],
        other: e.target.value,
      },
    });
  };

  const handleNextQuestion = () => {
    const currentQuestion = surveyQuestions[currentQuestionIndex];
    const currentAnswer = surveyAnswers[currentQuestion.id];

    if (!currentAnswer.selected) {
      setErrors({ [currentQuestion.id]: "Vui lòng chọn một lựa chọn" });
      return;
    }

    if (currentAnswer.selected === "Khác (vui lòng mô tả)" && !currentAnswer.other.trim()) {
      setErrors({ [currentQuestion.id]: "Vui lòng mô tả chi tiết" });
      return;
    }

    setErrors({});
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setErrors({});
    }
  };

  const getProgress = () => {
    return ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
  };

  const handleRoleSubmit = () => {
    if (!selectedRole) {
      setErrors({ role: "Vui lòng chọn vai trò của bạn" });
      return;
    }
    setShowSurvey(true);
  };

  const handleSurveySubmit = () => {
    // Here you would typically send all data to your backend
    console.log("Registration completed:", {
      ...formData,
      role: selectedRole,
      surveyAnswers,
    });
    
    // After successful registration, redirect to dashboard
    navigate("/dashboard");
  };

  const renderSurvey = () => {
    const currentQuestion = surveyQuestions[currentQuestionIndex];
    const currentAnswer = surveyAnswers[currentQuestion.id];

    return (
      <div className="survey-section">
        <button
          className="back-button"
          onClick={() => {
            setShowSurvey(false);
            setCurrentQuestionIndex(0);
          }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Quay Lại
        </button>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          <div className="progress-text">
            Câu hỏi {currentQuestionIndex + 1}/{surveyQuestions.length}
          </div>
        </div>

        <h2>Câu Hỏi Khảo Sát</h2>
        <p className="survey-description">
          Để hiểu rõ hơn về bạn và hỗ trợ bạn tốt nhất trong chương trình,
          vui lòng trả lời các câu hỏi sau:
        </p>

        <div className="survey-form">
          <div className="survey-question">
            <h3>{currentQuestion.question}</h3>
            <div className="options-list">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`option-button ${
                    currentAnswer.selected === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}>
                  {option}
                </button>
              ))}
            </div>

            {currentAnswer.selected === "Khác (vui lòng mô tả)" &&
              currentQuestion.allowOther && (
                <div className="other-input">
                  <textarea
                    value={currentAnswer.other}
                    onChange={handleOtherInput}
                    placeholder="Vui lòng mô tả chi tiết..."
                    className={errors[currentQuestion.id] ? "error" : ""}
                    rows="3"
                  />
                </div>
              )}

            {errors[currentQuestion.id] && (
              <div className="error-text">{errors[currentQuestion.id]}</div>
            )}
          </div>

          <div className="survey-actions">
            {currentQuestionIndex > 0 && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrevQuestion}>
                Quay Lại
              </button>
            )}
            {currentQuestionIndex < surveyQuestions.length - 1 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextQuestion}>
                Tiếp Tục
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSurveySubmit}>
                Hoàn Tất Đăng Ký
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Just navigate to home page without resetting states
    navigate('/');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="login-page" onClick={handleBackdropClick}>
      <div className="login-container">
        <button className="close-button" onClick={handleClose} aria-label="Đóng">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <div className="login-image">
          <div className="image-content">
            <h2>Chào mừng đến với Cộng Đồng BrightChoice</h2>
            <p>
              Tham gia cộng đồng tình nguyện viên của chúng tôi và tạo
              ra tác động tích cực trong cuộc chiến chống lại lạm dụng
              chất gây nghiện.
            </p>
          </div>
        </div>

        <div className="login-form-container">
          {!showRoleSelection && !showSurvey ? (
            <>
              <div className="form-switcher">
                <button
                  className={`switcher-btn ${isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(true)}>
                  Đăng Nhập
                </button>
                <button
                  className={`switcher-btn ${!isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(false)}>
                  Đăng Ký
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <h2>
                  {isLogin
                    ? "Đăng Nhập Vào Tài Khoản Của Bạn"
                    : "Tạo Tài Khoản Mới"}
                </h2>

                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="name">
                      <FontAwesomeIcon icon={faUser} /> Họ và Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <div className="error-text">{errors.name}</div>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} /> Địa Chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <div className="error-text">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} /> Mật Khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <div className="error-text">{errors.password}</div>
                  )}
                </div>

                {isLogin && (
                  <div className="form-options">
                    <div className="remember-me">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">
                      Quên mật khẩu?
                    </Link>
                  </div>
                )}

                <button type="submit" className="btn btn-primary submit-btn">
                  {isLogin ? "Đăng Nhập" : "Tiếp Tục"}
                </button>

                <div className="form-footer">
                  <p>
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={toggleForm}>
                      {isLogin ? "Đăng Ký" : "Đăng Nhập"}
                    </button>
                  </p>
                </div>
              </form>
            </>
          ) : showSurvey ? (
            renderSurvey()
          ) : (
            <div className="role-selection">
              <h2>Chọn Vai Trò Của Bạn</h2>
              <p className="role-description">
                Vui lòng chọn vai trò phù hợp với bạn trong cộng đồng của chúng tôi
              </p>

              <div className="roles-grid">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className={`role-card ${selectedRole === role.id ? "selected" : ""}`}
                    onClick={() => handleRoleSelection(role.id)}>
                    <FontAwesomeIcon icon={role.icon} className="role-icon" />
                    <h3>{role.title}</h3>
                    <p>{role.description}</p>
                  </button>
                ))}
              </div>

              {errors.role && (
                <div className="error-text">{errors.role}</div>
              )}

              <div className="role-selection-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowRoleSelection(false)}>
                  Quay Lại
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRoleSubmit}>
                  Hoàn Tất Đăng Ký
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
