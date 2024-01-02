import axios from 'axios';

// All shops orders
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: 'adminOrdersRequest',
    });

    const { data } = await axios.get(`http://localhost:5000/api/orders`, {
      withCredentials: true,
    });

    dispatch({
      type: 'adminOrdersSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'adminOrdersFail',
      payload: error.response.data.message,
    });
  }
};
