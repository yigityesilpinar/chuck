import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import RCSelect from 'react-select';

import { getRandomJoke } from 'api/jokes';
import { getCategories } from 'api/categories';

import { keyCodes } from './dict';

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
  left: 0;
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
    document.addEventListener('click', this.handleMouseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardDown);
    document.addEventListener('click', this.handleMouseClick);
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
    if (
      (keyCode >= keyCodes.KeyA && keyCode <= keyCodes.KeyZ) ||
      keyCode === keyCodes.Space
    ) {
      this.getJoke(this.state.selectedCategory.value);
    } else if (keyCode >= keyCodes.ArrowLeft && keyCode <= keyCodes.ArrowDown) {
      this.onArrowChangeCategory(keyCode);
    }
  };

  handleMouseClick = () => {
    this.getJoke(this.state.selectedCategory.value);
  };

  onArrowChangeCategory = keyCode => {
    const { selectedCategory, categories } = this.state;
    const currentCategoryIndex = categories
      .map(cat => cat.value)
      .indexOf(selectedCategory.value);
    if (keyCode === keyCodes.ArrowUp || keyCode === keyCodes.ArrowLeft) {
      if (currentCategoryIndex > 0) {
        this.changeOptionCategory(categories[currentCategoryIndex - 1]);
      } else {
        this.changeOptionCategory(categories[categories.length - 1]);
      }
    } else if (
      keyCode === keyCodes.ArrowRight ||
      keyCode === keyCodes.ArrowDown
    ) {
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
          isSearchable={false}
        />
        <FullScreen>
          <CenterBlock>{value}</CenterBlock>
        </FullScreen>
      </Fragment>
    );
  }
}

export default App;
