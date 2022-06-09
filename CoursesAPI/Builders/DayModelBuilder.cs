using CoursesAPI.Models.Calendar;

namespace CoursesAPI.Builders
{
    public class DayModelBuilder : IBuilder<DayModel, DateTime>
    {
        private DayModel _dayModel;
        public void Reset()
        {
            _dayModel = new DayModel();
        }
        
        public DayModel Build(DateTime dateTime)
        {
            this.Reset();
            this.Update(dateTime);
            return _dayModel;
        }


        public void Update(DayModel model, DateTime param)
        {
            model.Day = param.Day;
            model.Month = param.Month;
            model.Year = param.Year;
        }

        public void Update(DateTime param)
        {
            _dayModel.Day = param.Day;
            _dayModel.Month = param.Month;
            _dayModel.Year = param.Year;
        }
    }
}
