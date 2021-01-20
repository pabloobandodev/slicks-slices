const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `<div>
  <h2>Your recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
  ${order.map(
    (
      singleOrder
    ) => `<li> <img src="${singleOrder.thumbnail}" alt="${singleOrder.name}" /> 
        ${singleOrder.size} ${singleOrder.name} - ${singleOrder.price}
    </li>`
  )}</ul>
  </div>`;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  console.log('body -> ', body);

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzzstt good bye ERR' }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You're missing the ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  await transporter.sendMail({
    from: `Slick's Slices <slick@example.com>`,
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
