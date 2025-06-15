import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import api from '../api/api';

// 사용자 프로필 인터페이스 정의
interface UserProfile {
  username: string;
  nickname: string;
  email: string;
  authority: string;
}

const ProfilePage: React.FC = () => {
  const { nickname, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // 프로필 정보 가져오기
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setProfile(response.data);
        setEditedNickname(response.data.nickname);
      } catch (err) {
        console.error('프로필 로딩 에러:', err);
        setError('프로필을 불러오는데 실패했습니다.');
      }
    };

    fetchProfile();
  }, [isLoggedIn, navigate]);

  // 수정 모드 활성화
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 프로필 수정 저장
  const handleSave = async () => {
    try {
      await api.put('/api/profile', {
        nickname: editedNickname
      });
      setProfile(prev => prev ? { ...prev, nickname: editedNickname } : null);
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('프로필 수정 에러:', err);
      setError('프로필 수정에 실패했습니다.');
    }
  };

  // 수정 취소
  const handleCancel = () => {
    setEditedNickname(profile?.nickname || '');
    setIsEditing(false);
    setError('');
  };

  // 로딩 중 표시
  if (!profile) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">프로필</h1>
        
        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            {/* 사용자명 표시 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">사용자명</label>
              <div className="mt-1 text-gray-900">{profile.username}</div>
            </div>

            {/* 닉네임 표시/수정 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">닉네임</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-curpick-brown focus:ring-curpick-brown"
                />
              ) : (
                <div className="mt-1 text-gray-900">{profile.nickname}</div>
              )}
            </div>

            {/* 이메일 표시 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">이메일</label>
              <div className="mt-1 text-gray-900">{profile.email}</div>
            </div>

            {/* 권한 표시 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">권한</label>
              <div className="mt-1 text-gray-900">{profile.authority}</div>
            </div>

            {/* 수정/저장/취소 버튼 */}
            <div className="pt-4">
              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-curpick-brown text-white rounded hover:bg-curpick-brown/90"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-curpick-brown text-white rounded hover:bg-curpick-brown/90"
                >
                  수정
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 