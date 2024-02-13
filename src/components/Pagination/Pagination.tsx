import Icon from '@_components/Icon';
import css from './Pagination.module.scss';
import { useEffect, useState } from 'react';

interface Props {
  totalCount: number;
  limit: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({ totalCount, limit, offset, setOffset }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesPerBox = 5;

  const goToPrev = () => {
    if (offset !== 0) {
      setOffset(offset - limit);
    } else {
      return limit & offset;
    }
  };

  const goToNext = () => {
    if (limit > totalCount) {
      return limit & offset;
    } else {
      setOffset(offset + limit);
    }
  };

  const getCurrentPage = async () => {
    const pageNum = offset / limit + 1;

    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getCurrentPage();
  }, [offset]);

  const totalPage = Math.ceil(totalCount / limit);

  const pageNumbers: number[] = [];

  const renderingPagination = () => {
    if (totalCount <= limit) return;

    for (let i = 1; i <= totalPage; i++) {
      if (pageNumbers.length >= pagesPerBox) {
        pageNumbers.shift();
      }
      pageNumbers.push(i);
    }
  };

  renderingPagination();

  const getRightPage = (el: number) => {
    setOffset(el * limit - limit);
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
