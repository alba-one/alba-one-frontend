import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown/Dropdown';

import css from './MakeStore.module.scss';

const MakeStore = () => {
  return (
    <section className={css.makeStore}>
      <div className={css.title}>
        가게 정보 <Icon title="close" />
      </div>

      <div className={css.inputs}>
        <div className={css.storeName}>
          <div className={css.subTitle}>가게 이름*</div>
          <input className={css.miniInput} placeholder="입력해주세요." />
        </div>

        <div />

        <div className={css.category}>
          <div className={css.subTitle}>분류*</div>
          <div className={css.selectBox}>
            <Dropdown />
          </div>
        </div>

        <div className={css.location}>
          <div className={css.subTitle}>주소*</div>
          <div className={css.selectBox}>
            <Dropdown />
          </div>
        </div>

        <div />
        <div className={css.detail}>
          <div className={css.subTitle}>상세주소*</div>
          <input className={css.miniInput} placeholder="입력해주세요." />
        </div>

        <div className={css.detail}>
          <div className={css.subTitle}>기본 시급*</div>
          <div className={css.miniInput}>
            <input className={css.innerInput} placeholder="입력해주세요." />원
          </div>

          <div className={`${css.detail} ${css.moreText}`}>
            <div className={css.subTitle}>가게 설명</div>
            <textarea
              className={css.comments}
              placeholder="입력해주세요."
            ></textarea>
          </div>
        </div>

        <div />

        <div className={css.addImage}>
          <div className={css.subTitle}>가게 이미지</div>
          <div className={css.imageInputBox}>
            <div className={css.uploadBox}>
              <div id="imageBox" className={css.imageBox}>
                <Icon title="camera" />
                <p className={css.message}>이미지 추가하기</p>
                {/* <img src="" alt="미리보기 이미지" className={css.preview} /> */}
              </div>
            </div>
          </div>
        </div>

        <div />

        <div />
      </div>

      <button className={css.submitBtn}>등록하기</button>
    </section>
  );
};

export default MakeStore;
