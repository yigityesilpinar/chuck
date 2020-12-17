import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import RCSelect from 'react-select';
import useEventListener from '@use-it/event-listener';

import { getRandomJoke } from 'api/jokes';
import { getCategories } from 'api/categories';

import { keyCodes } from './dict';
import { getRandomJokes } from './api/jokes';

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

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    label: 'dev',
    value: 'dev'
  });

  useEffect(() => {
    const execute = async () => {
      const fetchedCategories = await getCategories();
      if (fetchedCategories) {
        const parsedCategories = fetchedCategories.map(cat => ({
          label: cat,
          value: cat
        }));
        setCategories(parsedCategories);
      }
    };
    execute();
  }, []);

  useEffect(() => {
    const execute = async () => {
      const fetchedJokes = await getRandomJokes(currentCategory.value);
      if (fetchedJokes) {
        setJokes(fetchedJokes);
      }
    };
    execute();
  }, [currentCategory.value]);

  const getJoke = async category => {
    const fetchedJoke = await getRandomJoke(category.value);
    if (fetchedJoke) {
      setJokes(oldJokes => [...oldJokes.splice(1), fetchedJoke]);
    }
  };

  const useMouseClick = () => {
    useEventListener('click', () => {
      getJoke(currentCategory);
    });
  };

  const changeCategoryWithKeyboard = keyCode => {
    const currentCategoryIndex = categories
      .map(cat => cat.value)
      .indexOf(currentCategory.value);
    if (keyCode === keyCodes.ArrowUp || keyCode === keyCodes.ArrowLeft) {
      if (currentCategoryIndex > 0) {
        setCurrentCategory(categories[currentCategoryIndex - 1]);
      } else {
        setCurrentCategory(categories[categories.length - 1]);
      }
    } else if (
      keyCode === keyCodes.ArrowRight ||
      keyCode === keyCodes.ArrowDown
    ) {
      if (currentCategoryIndex === categories.length - 1) {
        setCurrentCategory(categories[0]);
      } else {
        setCurrentCategory(categories[currentCategoryIndex + 1]);
      }
    }
  };

  const useKeydown = () => {
    useEventListener('keydown', ({ keyCode }) => {
      if (
        (keyCode >= keyCodes.KeyA && keyCode <= keyCodes.KeyZ) ||
        keyCode === keyCodes.Space
      ) {
        getJoke(currentCategory);
      } else if (
        keyCode >= keyCodes.ArrowLeft &&
        keyCode <= keyCodes.ArrowDown
      ) {
        changeCategoryWithKeyboard(keyCode);
      }
    });
  };

  useKeydown();
  useMouseClick();
  return (
    <Fragment>
    <div className="container">
      <h1>App consuming Chuck Norris API</h1>
      <h3>Categories</h3>
      <Select
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'lightblue',
            primary: 'gray'
          }
        })}
        options={categories}
        onChange={setCurrentCategory}
        value={currentCategory}
        isSearchable={false}
        />
      <FullScreen>
        <CenterBlock>{jokes[0] && jokes[0].value}</CenterBlock>
      </FullScreen>
    </div>
    </Fragment>
  );
};

export default App;