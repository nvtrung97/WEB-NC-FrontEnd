import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../services/api.service';

export default function useCourseDetail(courseId) {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await api.get(`/products/${courseId}`);
        setCourse(result.data);
      } catch (error) {
        console.log('Fail to fetch course: ', error);
      }
      setLoading(false);
    })();
  }, [courseId]);

  return { course, loading };
}
