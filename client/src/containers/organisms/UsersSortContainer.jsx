import React, { useState } from 'react';
import queryString from 'query-string';
import { useRouteMatch, useLocation } from 'react-router-dom';
import SortMenubar from '@/components/molecules/SortMenubar';
import AlignmentMenuBar from '@/components/molecules/AlignmentMenuBar';
import Sort from '@/components/molecules/Sort';

const SORT_EUNM = {
  id: '아아디',
  role: '권한',
  state: '상태',
};
const ALIGNMENT_EUNM = {
  desc: '내림차순',
  acs: '오름차순',
};

const UsersSortContainer = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const crrentQuery = queryString.parse(location.search);
  const { keyword = 'id', alignment = 'desc' } = crrentQuery;
  const [sortState, setSortState] = useState(keyword);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [alignmentState, setAlignmentState] = useState(alignment);
  const [isAlignmentOpen, setIsAlignmentOpen] = useState(false);

  const handleSortStateChange = e => {
    if (sortState !== e.target.id) {
      setSortState(e.target.id);
    }
  };
  const handleAlignmentStateChange = e => {
    if (sortState !== e.target.id) {
      setAlignmentState(e.target.id);
    }
  };

  const handleModalFoucsBlur = e => {
    if (e.defaultPrevented) return;
    setIsSortOpen(false);
    setIsAlignmentOpen(false);
  };

  const handleAlignmentMenubarOpen = e => {
    e.preventDefault();
    if (isSortOpen === false) {
      setIsAlignmentOpen(true);
    }
  };

  const handleSortMenubarOpen = e => {
    e.preventDefault();
    if (isAlignmentOpen === false) {
      setIsSortOpen(true);
    }
  };

  return (
    <Sort onClick={handleModalFoucsBlur}>
      <AlignmentMenuBar
        id={alignmentState}
        ALIGNMENT_EUNM={ALIGNMENT_EUNM}
        match={match}
        crrentQuery={crrentQuery}
        isOpen={isAlignmentOpen}
        setIsOpen={setIsAlignmentOpen}
        handleAlignmentStateChange={handleAlignmentStateChange}
        handleAlignmentMenubarOpen={handleAlignmentMenubarOpen}
      />
      <SortMenubar
        id={sortState}
        SORT_EUNM={SORT_EUNM}
        match={match}
        crrentQuery={crrentQuery}
        isOpen={isSortOpen}
        setIsOpen={setIsSortOpen}
        handleSortStateChange={handleSortStateChange}
        handleSortMenubarOpen={handleSortMenubarOpen}
      />
    </Sort>
  );
};

export default UsersSortContainer;
