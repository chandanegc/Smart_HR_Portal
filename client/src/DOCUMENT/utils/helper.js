import customFetch from "./customFetch";

export const verifyEmail = (email) => {
  const isGlobalLogicEmail = "@globallogic.com";
  const InternsEmailIds = [
    "joshiabhimanyoo@gmail.com",
    "vineetpandey6464@gmail.com",
    "irtiqa842@gmail.com",
    "vishakhachauhan599@gmail.com",
    "jyotikadasgupta2903@gmail.com",
    "shivanibhovad30@gmail.com",
    "anuradhav125@gmail.com",
    "chandanegc@gmail.com",
    "tribhuwankanaujiya112@gmail.com"
  ];
  return email.endsWith(isGlobalLogicEmail) || InternsEmailIds.includes(email);
};

export const images = [
  "url(loginPage/img1.jpg)",
  "url(loginPage/img2.jpg)",
  "url(loginPage/img3.jpg)",
  "url(loginPage/img4.jpg)",
];

export const signInApiCall = async (data) => {
  try {
    const res = await customFetch.post("/auth/register", data);
    return res.json();
  } catch (error) {
    return false;
  }
};
