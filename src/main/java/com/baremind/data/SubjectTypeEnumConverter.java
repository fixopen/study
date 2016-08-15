package com.baremind.data;

import org.eclipse.persistence.mappings.DatabaseMapping;
import org.eclipse.persistence.mappings.converters.Converter;
import org.eclipse.persistence.sessions.Session;
import org.postgresql.util.PGobject;

import java.sql.SQLException;
import java.sql.Types;

/**
 * Created by fixopen on 7/9/15.
 */
@javax.persistence.Converter(autoApply = true)
public class SubjectTypeEnumConverter implements Converter {
    private static final long serialVersionUID = 1L;
    //private static Logger logger = Logger.getLogger(EnumConverter.class);

    @Override
    public Object convertDataValueToObjectValue(Object object, Session session) {
        if (object instanceof PGobject) {
            return SubjectType.valueOf(SubjectType.class, ((PGobject) object).getValue());
        }
        return null;
    }

    @Override
    public Object convertObjectValueToDataValue(Object object, Session session) {
        if (object instanceof SubjectType) {
            PGobject pg = new PGobject();
            try {
                pg.setValue(((SubjectType) object).name());
                pg.setType("subject_type");
            } catch (SQLException e) {
                //logger.log(Level.FATAL, e);
            }
            return pg;
        }
        return object;
    }

    @Override
    public void initialize(DatabaseMapping dm, Session session) {
        dm.getField().setSqlType(Types.OTHER);
    }

    @Override
    public boolean isMutable() {
        return true;
    }
}
