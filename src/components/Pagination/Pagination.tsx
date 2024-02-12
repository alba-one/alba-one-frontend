import Icon from '@_components/Icon';
import css from './Pagination.module.scss';
import { useEffect, useState } from 'react';

interface Props {
  totalCount: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  limitNum: number;
}
const Pagination = ({
  totalCount,
  limit,
  setLimit,
  offset,
  setOffset,
  limitNum,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesPerBox = 5;

  const goToPrev = () => {
    if (offset !== 0) {
      setLimit(offset);
      setOffset(offset - limitNum);
    } else {
      return limit & offset;
    }
  };

  const goToNext = () => {
    if (limit > totalCount) {
      return limit & offset;
    } else {
      setLimit(limit + limitNum);
      setOffset(limit);
    }
  };

  const getCurrentPage = async () => {
    const pageNum = limit / limitNum;

    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getCurrentPage();
  }, [limit]);

  // pagination
  //o  ** page numbers **
  //o  1. total count / perpage = amount of page
  //o  2. amount of page / page per box = page boxes

  // ** selected page **
  // 1. current page
  // 2. how can i get the current ? : offset number? = (limitNum * n) +1
  //o  3. default offset = 1 : useState(1) == currentPage

  const totalPage = Math.ceil(totalCount / limitNum);
  const pageBoxes = Math.ceil(totalPage / pagesPerBox);
  const pageNumbers: number[] = [];

  const renderingPagination = () => {
    if (totalCount <= limitNum) return;

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  };

  renderingPagination();

  const getRightPage = (el: number) => {
    setOffset(el * limitNum - limitNum);
    setLimit(el * limitNum);
  };

  return (
    <section className={css.container}>
      <div className={css.chevron} onClick={goToPrev}>
        <Icon title="chevronLeft" />
      </div>
      {pageNumbers.map((el, idx) => {
        return (
          <div
            key={idx}
            className={` ${
              currentPage === idx + 1 ? css.selected : css.number
            }`}
            onClick={() => {
              getRightPage(el);
            }}
          >
            {el}
          </div>
        );
      })}

      <div className={css.chevron} onClick={goToNext}>
        <Icon title="chevronRight" />
      </div>
    </section>
  );
};

export default Pagination;
