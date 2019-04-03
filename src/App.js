import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { getRandomJoke } from 'api/jokes';
import { getCategories } from 'api/categories';
import RCSelect from 'react-select';

const FullScreen = styled('div')`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CenterBlock = styled('div')`
  font-size: xx-large;
  margin: auto;
  position: absolute;
  width: 70%;
  top: 35%;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Select = styled(RCSelect)`
  position: absolute;
  top: 0;
  right: 0;
  width: 10em;
  margin: 1em;
`;

class App extends Component {
  state = {
    joke: {},
    categories: [],
    selectedCategory: { label: 'dev', value: 'dev' }
  };

  componentDidMount() {
    this.getJoke(this.state.selectedCategory.value);
    this.getCategories();
    document.addEventListener('keydown', this.handleKeyboardDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardDown);
  }

  getJoke = async category => {
    const joke = await getRandomJoke(category);
    if (joke) {
      this.setState({ joke });
    }
  };

  getCategories = async () => {
    const categories = await getCategories();
    if (categories) {
      const parsedCategories = categories.map(cat => ({
        label: cat,
        value: cat
      }));
      this.setState({ categories: parsedCategories });
    }
  };

  handleKeyboardDown = ({ keyCode }) => {
    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
      // letter or space bar
      this.getJoke(this.state.selectedCategory.value);
    } else if (keyCode >= 37 && keyCode <= 40) {
      // arrows
      this.onArrowChangeCategory(keyCode);
    }
  };

  onArrowChangeCategory = keyCode => {
    const { selectedCategory, categories } = this.state;
    const currentCategoryIndex = categories
      .map(cat => cat.value)
      .indexOf(selectedCategory.value);
    if (keyCode === 38 || keyCode === 37) {
      if (currentCategoryIndex > 0) {
        this.changeOptionCategory(categories[currentCategoryIndex - 1]);
      } else {
        this.changeOptionCategory(categories[categories.length - 1]);
      }
    } else if (keyCode === 39 || keyCode === 40) {
      if (currentCategoryIndex === categories.length - 1) {
        this.changeOptionCategory(categories[0]);
      } else {
        this.changeOptionCategory(categories[currentCategoryIndex + 1]);
      }
    }
  };

  changeOptionCategory = category => {
    this.setState({ selectedCategory: category });
    this.getJoke(category.value);
  };

  render() {
    const {
      joke: { value },
      categories,
      selectedCategory
    } = this.state;
    return (
      <Fragment>
        <Select
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'lightgrey',
              primary: 'black'
            }
          })}
          options={categories}
          onChange={this.changeOptionCategory}
          defaultValue={selectedCategory}
          value={selectedCategory}
        />
        <FullScreen>
          <CenterBlock>{value}</CenterBlock>
        </FullScreen>
      </Fragment>
    );
  }
}

export default App;
