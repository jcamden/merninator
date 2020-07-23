import React from 'react';
import Project from './Project';

export default {
  title: 'views/Projects',
  component: Project,
};

export const project = () => <Project title="test project!" completed={true} />;
