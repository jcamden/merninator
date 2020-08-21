import { isString } from '@merninator/lib';
import qs from 'query-string';
import { useCallback, useState } from 'react';

const setQueryStringWithoutPageReload = (qsValue: string): void => {
  const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + qsValue;

  window.history.pushState({ path: newurl }, '', newurl);
};

const setQueryStringValue = (key: string, value: string, queryString = window.location.search): void => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (key: string, queryString = window.location.search): string | null => {
  const values = qs.parse(queryString);
  const value = values[key];

  if (isString(value)) {
    return value;
  } else return null;
};

export const useQueryString = (key: string, initialValue: string): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    newValue => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key],
  );

  return [value, onSetValue];
};

export default useQueryString;
