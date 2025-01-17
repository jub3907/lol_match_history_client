import ReloadButton from '@common/Button/ReloadButton';
import List from '@common/List/List';
import { Button } from '@mui/material';
import { getSummonerCommentUrl } from 'config/path';
import { selectSummonerState } from 'lib/slice/summonerSlice';
import { CommentType } from 'lib/types/comment';
import { getDateFromNow } from 'lib/utils/date';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CommentList.module.scss';
import apiPath from 'config/apiPath';

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div className={styles.comments}>
      {comments && comments.length > 0 ? (
        comments.map(
          ({ createdDate, nickname, content }: CommentType, index) => {
            return (
              <div
                className={styles.comment}
                key={`comment-${createdDate}-${index}}`}
              >
                <div className={styles.writer}>
                  <div className={styles.nickname}>{nickname}</div>
                  <div className={styles.date}>
                    {getDateFromNow(createdDate)}
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.text}>{content}</div>
              </div>
            );
          },
        )
      ) : (
        <div className={styles.empty}>작성된 댓글이 없습니다!</div>
      )}
    </div>
  );
};

const CommentButton = ({
  gameName,
  tagLine,
}: {
  gameName: string;
  tagLine: string;
}) => {
  return (
    <Link href={getSummonerCommentUrl(gameName, tagLine)}>
      <Button variant="contained" fullWidth className={styles.button}>
        더보기 {'>'}
      </Button>
    </Link>
  );
};

// TODO: 컴포넌트 분리
const CommentList = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { puuid, name, gameName, tagLine } = useSelector(selectSummonerState);
  const uri = (apiPath.base + apiPath.comment + '?offset=0&limit=2').replace(
    '[puuid]',
    puuid,
  );

  const fetchData = () => {
    fetch(uri, {
      method: 'GET',
      next: { revalidate: 300 },
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [puuid]);

  return (
    <>
      <List
        title="최근 한마디"
        contents={<Comments comments={comments} />}
        button={<CommentButton gameName={gameName} tagLine={tagLine} />}
        loading={isLoading}
        error={null}
        reloadButton={
          <ReloadButton
            onClick={() => {
              fetchData();
            }}
            className={styles.reload}
            loading={isLoading}
          />
        }
      />
    </>
  );
};

export default CommentList;
