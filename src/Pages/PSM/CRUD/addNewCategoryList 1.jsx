ef3$direction = _ref3.direction,
      direction = _ref3$direction === void 0 ? 'next' : _ref3$direction,
      _ref3$reason = _ref3.reason,
      reason = _ref3$reason === void 0 ? 'auto' : _ref3$reason;
    if (!popupOpen) {
      return;
    }
    var getNextIndex = function getNextIndex() {
      var maxIndex = filteredOptions.length - 1;
      if (diff === 'reset') {
        return defaultHighlighted;
      }
      if (diff === 'start') {
        return 0;
      }
      if (diff === 'end') {
        return maxIndex;
      }
      var newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    var nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason: reason,
      event: event
    });

    // Sync the content of the input with the highlighted option.
    if (autoComplete && diff !== 'reset') {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        var option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;

        // The portion of the selected suggestion that has not been typed by the user,
        // a completion string, appears inline after the input cursor in the textbox.
        var index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  var checkHighlightedOptionExists = function checkHighlightedOptionExists() {
    var isSameValue = function isSameValue(value1, value2) {
      var label1 = value1 ? getOptionLabel(value1) : '';
      var label2 = value2 ? getOptionLabel(value2) : '';
      return label1 === label2;
    };
    if (highlightedIndexRef.current !== -1 && previousProps.filteredOptions && previousProps.filteredOptions.length !== filteredOptions.length && previousProps.inputValue === inputValue && (multiple ? value.length === previousProps.value.length && previousProps.value.every(function (val, i) {
      return getOptionLabel(value[i]) === getOptionLabel(val);
    }) : isSameValue(previousProps.value, value))) {
      var previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];
      if (previousHighlightedOption) {
        var previousHighlightedOptionExists = filteredOptions.some(function (option) {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
        if (previousHighlightedOptionExists) {
          return true;
        }
      }
    }
    return false;
  };
  var syncHighlightedIndex = React.useCallback(function () {
    if (!popupOpen) {
      return;
    }

    // Check if the previously highlighted option still exists in the updated filtered options list and if the value and inputValue haven't changed
    // If it exists and the value and the inputValue haven't changed, return, otherwise continue execution
    if (checkHighlightedOptionExists()) {
      return;
    }
    var valueItem = multiple ? value[0] : value;

    // The popup is empty, reset
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: 'reset'
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }

    // Synchronize the value with the highlighted index
    if (valueItem != null) {
      var currentOption = filteredOptions[highlightedIndexRef.current];

      // Keep the current highlighted index if possible
      if (multiple && currentOption && findIndex(value, function (val) {
        return isOptionEqualToValue(currentOption, val);
      }) !== -1) {
        return;
      }
      var itemIndex = findIndex(filteredOptions, function (optionItem) {
        return isOptionEqualToValue(optionItem, valueItem);
      });
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: 'reset'
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }

    // Prevent the highlighted index to leak outside the boundaries.
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }

    // Restore the focus to the previous index.
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
    // Ignore filteredOptions (and options, isOptionEqualToValue, getOptionLabel) not to break the scroll position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
  // Only sync the highlighted index when the option switch between empty and not
  filteredOptions.length,
  // Don't sync the highlighted index with the value when multiple
  // eslint-disable-next-line react-hooks/exhaustive-deps
  multiple ? false : value, filterSelectedOptions, changeHighlightedIndex, setHighlightedIndex, popupOpen, inputValue, multiple]);
  var handleListboxRef = useEventCallback(function (node) {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(function () {
      if (!inputRef.current || inputRef.current.nodeName !== 'INPUT') {
        if (inputRef.current && inputRef.current.nodeName === 'TEXTAREA') {
          console.warn(["A textarea element was provided to ".concat(componentName, " where input was expected."), "This is not a supported scenario but it may work under certain conditions.", "A textarea keyboard navigation may conflict with Autocomplete controls (e.g. enter and arrow keys).", "Make sure to test keyboard navigation and add custom event handlers if necessary."].join('\n'));
        } else {
          console.error(["MUI: Unable to find the input element. It was resolved to ".concat(inputRef.current, " while an HTMLInputElement was expected."), "Instead, ".concat(componentName, " expects an input element."), '', componentName === 'useAutocomplete' ? 'Make sure you have bound getInputProps correctly and that the normal ref/effect resolutions order is guaranteed.' : 'Make sure you have customized the input component correctly.