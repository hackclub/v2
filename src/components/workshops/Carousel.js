import React, { Component, Fragment } from "react";
import api from "api";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section,
  Image,
  BackgroundImage,
  theme
} from "@hackclub/design-system";

class CarouselProject extends Component {
  state = { status: "loading" };

  render() {
    const { live_url, code_url, screenshot } = this.props.project;

    return (
      <Box p={4} bg="smoke" flexShrink={1}>
        <Image
          src={"http://api.hackclub.com" + screenshot.file_path}
          height={256}
        />
        <A href={live_url}>Live!</A>
        <A href={code_url}>Code!</A>
      </Box>
    );
  }
}

class Carousel extends Component {
  constructor(props) {
    super(props);

    const { slug } = props;

    this.state = {};

    const exampleData = {
      live_url: "https://zachlatta.github.io",
      code_url: "https://github.com/zachlatta/zachlatta.github.io",
      screenshot: {
        id: 4,
        created_at: "2018-04-13T03:18:50.716Z",
        updated_at: "2018-04-13T03:19:06.553Z",
        type: "workshop_project_screenshot",
        file_path:
          "/rails/active_storage/variants/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2dMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f1d52341ad5ccaccbb2b3a4b1b191d57fd531b4/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdERG9LYzNSeWFYQlVPZzVwYm5SbGNteGhZMlZKSWdwUWJHRnVaUVk2QmtWVU9oSm5ZWFZ6YzJsaGJsOWliSFZ5Wmdrd0xqQTFPZ3h4ZFdGc2FYUjVTU0lJT0RVbEJqc0hWRG9MWkdWbWFXNWxTU0lhYW5CbFp6cGtZM1F0YldWMGFHOWtQV1pzYjJGMEJqc0hWRG9VYzJGdGNHeHBibWRmWm1GamRHOXlTU0lLTkRveU9qQUdPd2RVT2d0eVpYTnBlbVZKSWdrMU1EQjRCanNIVkE9PSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--7d4c10d23979a9bcafff7ea8da85dcefd2837226/Screenshot%202018-04-12%2020.18.17.png"
      }
    };

    this.state.original = { ...exampleData };
    this.state.projects = [
      { ...exampleData },
      { ...exampleData },
      { ...exampleData }
    ];

    api.get(`v1/workshops/${slug}/projects`).then(projects => {
      this.setState({
        projects
      });
    });
  }
  render() {
    const { slug } = this.props;
    const { original, projects } = this.state;

    return (
      <Container>
        <Flex
          bg="smoke"
          flexDirection="column"
          align="stretch"
          justify="space-between"
          style={{
            margin: 10,
            borderRadius: 20
          }}
        >
          <Flex align="stretch" justify="space-between">
            <Flex
              align="center"
              justify="space-between"
              style={{
                margin: 10,
                flexGrow: 1,
                flexBasis: 1
              }}
            >
              <Heading.h2>Personal Website</Heading.h2>
              <Heading.h4>Original by @msw;</Heading.h4>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              style={{
                margin: 10,
                flexGrow: 1,
                flexBasis: 1
              }}
            >
              <Heading.h4>rehacked by @cwalker</Heading.h4>
            </Flex>
          </Flex>
          <Flex align="stretch" justify="space-between">
            <CarouselProject project={original} />
            <CarouselProject project={projects[0]} />
          </Flex>
        </Flex>
      </Container>
    );
  }
}

export default Carousel;
