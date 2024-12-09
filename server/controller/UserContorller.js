import Student from "../model/StudentsModel.js";
import Teacher from "../model/TeacherModel.js";
import User from "../model/userSchema.js";

// Set user type and update status
const setUser = async (req, res) => {
  const { userType } = req.body;

  if (!req.userId) {
    return res.status(403).json({ message: "Unauthorized. Please log in." });
  }

  try {
    // Find the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user type
    user.userType = userType;

    // Optional: If you want to set status based on user type
    if (userType === "Student" || userType === "Teacher") {
      user.status = "Partial"; // Set status to Partial when user type is set
    }

    await user.save();

    res.status(200).json({ message: "User type updated successfully.", user });
  } catch (error) {
    console.error("Error updating user type:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Complete the user profile based on user type
const completeProfile = async (req, res) => {
  const {
    grade,
    school,
    achievements,
    enrolledCourses,
    learningStats,
    subject,
    qualification,
    experience,
    currentSchool,
    courses,
    teachingStats,
  } = req.body;

  if (!req.userId) {
    return res.status(403).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.userType === "Student") {
      const studentProfile = await Student.findOneAndUpdate(
        { userId: user._id },
        {
          grade,
          school,
          achievements,
          enrolledCourses,
          learningStats,
        },
        { new: true, upsert: true }  // upsert: true creates a new profile if one doesn't exist
      );
    } else if (user.userType === "Teacher") {
      const teacherProfile = await Teacher.findOneAndUpdate(
        { userId: user._id },
        {
          subject,
          qualification,
          experience,
          currentSchool,
          achievements,
          courses,
          teachingStats,
        },
        { new: true, upsert: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    user.status = "Completed";
    await user.save();

    res.status(200).json({ message: "Profile completed successfully." });
  } catch (error) {
    console.error("Error completing profile:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

const fetchTeacher = async (req, res) => {
  const { userId } = req.body;
  console.log("user id of tescher", userId);
  try {
    const teacher = await Teacher.findOne({ userId });
    // console.log(teacher);
    res.status(200).json({ teacher });
  } catch (error) {
    console.log("Erroe occured in fetching teacher");
  }
};
const handleChanges = async (req, res) => {
  console.log(req.body);
  try {
    const {
      userId,
      subject,
      qualification,
      experience,
      currentSchool,
      achievements,
      courses,
      phone,
      location,
      fullName,
    } = req.body;

    // Update Teacher schema
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { userId: userId }, // Find by userId
      {
        $set: {
          subject: subject.filter((subj) => subj !== ""), // Filter out empty subjects
          qualification: qualification,
          experience: experience,
          currentSchool: currentSchool,
          achievements: achievements.filter((ach) => ach !== ""), // Filter out empty achievements
          courses: courses.map((course) => ({
            title: course.title,
            students: course.students,
          })),
        },
      },
      { new: true } // Return the updated document
    );

    // Update User schema
    const updatedUser = await User.findOneAndUpdate(
      { uid: userId }, // Find by userId in the User schema
      {
        $set: {
          phone: phone,
          fullName: fullName,
          location: location,
        },
      },
      { new: true }
    );

    // Check if both Teacher and User documents were found and updated
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated teacher data", updatedTeacher);
    console.log("Updated user data", updatedUser);
    return res.status(200).json({
      message: "Teacher and user updated successfully",
      updatedTeacher,
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating teacher and user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export { setUser, completeProfile, fetchTeacher, handleChanges };
