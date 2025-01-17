import { ChampionKey } from 'config/championKey';
import { SpellKey } from 'config/spellKey';

export type ParticipantBasicType = {
  riotIdGameName: string;
  riotIdTagLine: string;
  championId: ChampionKey;
  puuid: string;
};

export type ParticipantDetailType = {
  isWin: boolean;
  // 라인
  teamPosition: string;
  // 이름
  riotIdGameName: string;
  riotIdTagLine: string;
  puuid: string;

  // 팀
  teamId: number;

  // 챔피언 레벨
  champLevel: number;
  // 챔피언 이름
  championName: string;
  // 챔피언 아이디
  championId: ChampionKey;
  // 스펠 1~4
  summoner1Id: SpellKey;
  summoner2Id: SpellKey;
  // 아이템 0~6
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;

  baronKills: number;
  dragonKills: number;
  turretKills: number;

  // 킬
  // 데스
  // 어시스트
  kills: number;
  deaths: number;
  assists: number;
  // CS
  totalMinionsKilled: number;
  // 골드획득량
  goldEarned: number;
  // 피해량
  totalDamageDealtToChampions: number;
  // 받은피해량
  totalDamageTaken: number;

  // 시야 점수
  visionScore: number;
  // 와드 설치
  wardsPlaced: number;
  detectorWardsPlaced: number;
};

export type PerkType = {
  offense: number;
  flex: number;
  defense: number;

  primaryStyle: number;
  primary_1: number;
  primary_2: number;
  primary_3: number;

  subStyle: number;
  sub_1: number;
  sub_2: number;
};
