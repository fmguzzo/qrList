import codeMessage from "./codeMessage";

const successHandler = (response, typeNotification = {}) => {
  if (!response.data.result) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }
  const { data } = response;
  if (data.success === false) {
    const message = data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    console.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else {
    const message = data && data.message;
    const successText = message || codeMessage[response.status];
    const { status } = response;
    console.log({
      message: `Request success`,
      description: successText,
    });
  }

  return data;
};

export default successHandler;
