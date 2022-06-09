using CoursesAPI.Models.Calendar;

namespace CoursesAPI.Builders
{
    public interface IBuilder<T> where T : class
    {
        public void Reset();
    }
    public interface IBuilder<T, K> : IBuilder<T> where T : class
    {
        public T Build(K param);
        public void Update(K param);
        public void Update(T model, K param);
    }

    public interface IBuilder<T, K, L> : IBuilder<T> where T : class
    {
        public T Build(K paramOne, L paramTwo);
        public void Update(K paramOne, L paramTwo);
        public void Update(T model, K paramOne, K paramTwo);
    }

    public interface IBuilder<T, K, L, S> : IBuilder<T> where T : class
    {
        public T Build(K paramOne, L paramTwo, S paramThree);
        public void Update(K paramOne, L paramTwo, S paramThree);
        public void Update(T model, K paramOne, L paramTwo, S paramThree);
    }
}
