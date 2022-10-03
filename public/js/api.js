let api = "http://localhost:4000/api/numbers";

const getNumber = async (id) => {
  const res = await fetch(`${api}/${id}`);
  return {
    status: res.status,
    data: await res.json(),
  };
};

const getAllNumbers = async () => {
  const res = await fetch(api);
  return { status: res.status, data: await res.json() };
};

const createNumber = async (n) => {
  const data = {
    number: n,
  };
  const res = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

const updateNumber = async (id, number) => {
  const data = {
    id,
    number,
  };
  const res = await fetch(`${api}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return {
    status: res.status,
  };
};
const deleteNumber = async (id) => {
  const res = await fetch(`${api}/${id}`, {
    method: "delete",
  });
  return {
    status: res.status,
  };
};

const apiNumber = {
  getNumber,
  getAllNumbers,
  createNumber,
  updateNumber,
  deleteNumber,
};

export default apiNumber;
