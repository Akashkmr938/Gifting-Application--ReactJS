import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import * as Email from 'emailjs-com';

const styles = () => ({
  card: {
    maxWidth: 420,
    marginTop: 50
  },
  container: {
    display: "Flex",
    justifyContent: "center"
  },
  actions: {
    float: "right"
  }
});

const courseCategory = [
  {
    value: "Happy Wedding",
    label: "Happy Wedding"
  },
  {
    value: "Happy Birthday",
    label: "Happy Birthday"
  },
  {
    value: "Here's a gift for you",
    label: "Here's a gift for you"
  }
];

const Form = props => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="firstName"
          label="First Name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.firstName ? errors.firstName : ""}
          error={touched.firstName && Boolean(errors.firstName)}
          margin="dense"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.lastName ? errors.lastName : ""}
          error={touched.lastName && Boolean(errors.lastName)}
          margin="dense"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email ? errors.email : ""}
          error={touched.email && Boolean(errors.email)}
          margin="dense"
          variant="outlined"
          fullWidth
        />
        <TextField
          select
          id="course"
          label="Select a messsage"
          value={values.course}
          onChange={handleChange("course")}
          helperText={touched.course ? errors.course : ""}
          error={touched.course && Boolean(errors.course)}
          margin="dense"
          variant="outlined"
          fullWidth
        >
          {courseCategory.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            SUBMIT
            </Button>
          <Button color="secondary" onClick={handleReset}>
            CLEAR
            </Button>
        </div>
      </form>
    </div>
  );
};

const SendGift = withFormik({
  mapPropsToValues: ({
    firstName,
    lastName,
    email,
    course
  }) => {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      course: course || ""
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    course: Yup.string().required("Select your course category")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const templateParams = {
      from_name: 'Team YoYoGift',
      to_name: values.firstName + values.lastName,
      toEmail: values.email,
      message_html:
        '<h1>' +
        values.course +
        '</h1><br><a href="localhost:3000/gifts/redeem">Redeem</a>'
    };

    Email.send(
      'sendgrid',
      'template_wip4OUkH',
      templateParams,
      'user_qbov9EGUjkJiDJxkuPoQ0'
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
      console.log('FAILED...', err);
    }
    );
    setSubmitting(false);
  }
})(Form);

export default withStyles(styles)(SendGift);