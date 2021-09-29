import _ from "lodash";
import { useAppSelector } from "../../../../app/store";
import { VerificationCriteria } from "../../../../types/models";
import VerificationCriteriaForm from "./VerificationCriteriaForm";

type Props = {
  verificationCriterias: VerificationCriteria[];
};

const CompanyEditVerificationCriteria = (props: Props) => {
  const { verificationCriterias } = props;
  const { criterias } = useAppSelector((state) => state.criteria);

  return (
    <div className="criteria-group">
      {_.map(verificationCriterias, (item, index) => {
        const criteria = _.find(criterias, criteria => criteria.id === item.criteriaId);
        return (
          <VerificationCriteriaForm
            key={index}
            criteria={criteria}
            verificationCriteria={item}
          />
        );
      })}
    </div>
  );
}

export default CompanyEditVerificationCriteria;
