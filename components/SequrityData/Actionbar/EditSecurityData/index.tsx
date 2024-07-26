import { useEffect, useRef, useState } from "react";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import TextArea from "../../../../components/common/TextArea";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/utils/axios-client";
import styles from "./index.module.css";
import Select from "@/components/common/Select";

interface Props {
  securityDataId: any;
}

export default function EditSecurityData({ securityDataId }: Props) {
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<any>(null);
  const severityRef = useRef<HTMLSelectElement>(null);
  const detectedAtRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const assignedToRef = useRef<HTMLInputElement>(null);
  const responseTimeRef = useRef<HTMLInputElement>(null);
  const threatSourceRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<any>(null);
  const [success, setSuccess] = useState<any>(null);
  const { setNotification, user } = useAuth();
  const [securityData, setSecurityData] = useState<any>({
    type: "",
    description: "",
    severity: "",
    detected_at: "",
    value: "",
    status: "",
    assigned_to: "",
    response_time: "",
    threat_source: "",
  });

  useEffect(() => {
    setErrors(null);
    setSuccess(null);
    axiosClient
      .get(`/security-data/${securityDataId}`)
      .then(({ data }) => {
        setSecurityData(data?.data);
      })
      .catch((err) => {
        console.error("Error fetching security data:", err);
      });
  }, [securityDataId]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const payload = {
      id: securityDataId,
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
      severity: severityRef.current?.value,
      detected_at: detectedAtRef.current?.value,
      value: valueRef.current?.value,
      status: statusRef.current?.value,
      assigned_to: assignedToRef.current?.value,
      response_time: responseTimeRef.current?.value,
      threat_source: threatSourceRef.current?.value,
    };

    axiosClient
      .put(`/security-data/${securityDataId}`, payload)
      .then(({ data }) => {
        console.log("Security data updated successfully:", data);
        setErrors(null);
        setNotification("Security data updated successfully");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          setSuccess(null);
        } else {
          console.error("Error updating security data:", err);
        }
      });
  };

  const handleChange = (key: string, value: string) => {
    setSecurityData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onDeleteClick = (securityData: any) => {
    if (
      !window.confirm("Are you sure you want to delete this security data?")
    ) {
      return;
    }
    axiosClient.delete(`/security-data/${securityData.id}`).then(() => {
      setNotification("Security data was successfully deleted");
    });
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit} className={styles.formEdit}>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {success && (
          <div className="success">
            <p>{success}</p>
          </div>
        )}

        <Select
          ref={typeRef}
          label="Type"
          value={securityData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          options={[
            { value: "", label: "Select Type" },
            { value: "Phishing", label: "Phishing" },
            { value: "Malware", label: "Malware" },
            { value: "Ransomware", label: "Ransomware" },
            { value: "DDoS", label: "DDoS" },
            { value: "Data Breach", label: "Data Breach" },
          ]}
        />

        <TextArea
          label="Description"
          id="description"
          placeholder="Enter the Description here..."
          value={securityData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          ref={descriptionRef}
        />

        <Select
          ref={severityRef}
          label="Severity"
          value={securityData.severity}
          onChange={(e) => handleChange("severity", e.target.value)}
          options={[
            { value: "", label: "Select Severity" },
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
            { value: "Critical", label: "Critical" },
          ]}
        />

        <Input
          label="Detected At"
          ref={detectedAtRef}
          type="datetime-local"
          id="detected_at"
          placeholder="Detected At"
          value={securityData.detected_at}
          onChange={(e) => handleChange("detected_at", e.target.value)}
        />

        <Input
          label="Value"
          ref={valueRef}
          type="number"
          id="value"
          placeholder="Value"
          value={securityData.value}
          onChange={(e) => handleChange("value", e.target.value)}
        />

        <Select
          ref={statusRef}
          label="Status"
          value={securityData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={[
            { value: "", label: "Select Status" },
            { value: "open", label: "Open" },
            { value: "in_progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
          ]}
        />

        <Input
          label="Assigned To"
          ref={assignedToRef}
          type="text"
          id="assigned_to"
          placeholder="Assigned To"
          value={securityData.assigned_to}
          onChange={(e) => handleChange("assigned_to", e.target.value)}
        />

        <Input
          label="Response Time"
          ref={responseTimeRef}
          type="datetime-local"
          id="response_time"
          placeholder="Response Time"
          value={securityData.response_time}
          onChange={(e) => handleChange("response_time", e.target.value)}
        />

        <Input
          label="Threat Source"
          ref={threatSourceRef}
          type="text"
          id="threat_source"
          placeholder="Threat Source"
          value={securityData.threat_source}
          onChange={(e) => handleChange("threat_source", e.target.value)}
        />

        <Button type="submit" label="Edit" btn="btn-edit btn-block" />
      </form>
      <br />
      <Button
        type="button"
        onClick={() => onDeleteClick(securityData)}
        label="Delete"
        btn="btn-delete btn-block"
      />
    </div>
  );
}
