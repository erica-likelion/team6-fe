import MenuItem from './MenuItem';

export default function MenuList() {
  return (
    <div className="divide-y divide-gray-100">
      <MenuItem label="내가 모은 칭호" onClick={() => console.log('칭호')} />
      <MenuItem label="내 정보 수정" onClick={() => console.log('내 정보 수정')} />
    </div>
  );
}
