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

export const logoutUser = async () => {
  await customFetch("/auth/logout");
  localStorage.removeItem("role");
  localStorage.removeItem("credential");
};

export const upperFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1);

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24)); // in days

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};