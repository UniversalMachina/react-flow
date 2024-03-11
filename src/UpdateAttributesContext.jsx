// UpdateAttributesContext.js
import React from 'react';

const UpdateAttributesContext = React.createContext({
  updateAttributes: () => console.warn('updateAttributes function not provided'),
});

export default UpdateAttributesContext;
