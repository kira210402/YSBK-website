const getAbout = async(req, res) => {
  try {
    return res.status(200).json({
      clbName: "CLB Yêu sách Bách Khoa Hà Nội",
      email: "clbyeusachbachkhoahanoi@gmail.com",
      phoneNumber: "0376298583",
      facebook: "https://www.facebook.com/CLBYeuSachBachKhoaHaNoi",
    })
  } catch (error) {
    return res.status(500).json({error});
  }
};

export {
  getAbout,
}